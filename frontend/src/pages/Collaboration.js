import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Chat, CodeEditor, QuestionPanel } from '../components/Collaboration';
import { QuestionContent } from '../components/Question';
import { getRandomQuestionByCriteria } from '../api/QuestionApi';
import { showFailureToast } from '../utils/toast';
import { Event } from '../constants';
import env from '../loadEnvironment';
import '../css/Collaboration.css';

const Collaboration = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const socket = io(env.COLLAB_URL);
  const { roomId, displayName, questionData, jwt } = location.state || {};
  const { complexity, language } = questionData || {};

  useEffect(() => {
    const initializeRoom = async () => {
      // If roomId is not present in the location state, redirect to landing page
      if (!roomId) {
        showFailureToast('Invalid Room');
        navigate('/landing');
      }

      // Join the Socket.io room when the component mounts
      socket.emit(Event.JOIN_ROOM, { room: roomId, user: displayName });

      const storedQuestion = sessionStorage.getItem(`question_${roomId}`);
      let question = JSON.parse(storedQuestion);

      if (!question) {
        // If the question is not in sessionStorage, generate and store it
        question = await getRandomQuestionByCriteria(complexity, jwt);
        sessionStorage.setItem(`question_${roomId}`, JSON.stringify(question));
        socket.emit(Event.Question.QUESTION_CHANGE, {
          room: roomId,
          question: question,
        });
      }
      setSelectedQuestion(question);
    };
    initializeRoom();
  }, []);

  const handleLeaveRoom = () => {
    sessionStorage.removeItem(`codeEditorContent_${roomId}`); // Remove CodeMirror content from session storage when leaving the room
    socket.emit(Event.LEAVE_ROOM, { room: roomId, user: displayName });
    navigate('/landing');
  };

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  // Send question changes to the server
  const handleQuestionChange = (question) => {
    if (question !== selectedQuestion) {
      setSelectedQuestion(question);
      socket.emit(Event.Question.QUESTION_CHANGE, {
        room: roomId,
        question: question,
      });
    }
  };

  // Receive question changes from the server
  useEffect(() => {
    socket.on(Event.Question.QUESTION_UPDATE, (updatedQuestion) => {
      if (updatedQuestion !== selectedQuestion) {
        setSelectedQuestion(updatedQuestion);
        sessionStorage.setItem(
          `question_${roomId}`,
          JSON.stringify(updatedQuestion)
        );
      }
    });
  }, [socket, selectedQuestion]);

  return (
    <div>
      <div className='collaboration-container'>
        <div className='collaboration-header'>
          <div className='d-flex justify-content-between'>
            <button
              type='button'
              className='btn btn-primary me-2'
              onClick={handleOpenPanel}
            >
              Change Question
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleLeaveRoom}
            >
              Leave Room
            </button>
          </div>
        </div>
        <div className='content'>
          <div className='left'>
            {selectedQuestion && (
              <QuestionContent question={selectedQuestion} />
            )}
          </div>
          <div className='right'>
            <CodeEditor
              socket={socket}
              roomId={roomId}
              selectedLanguage={language}
            />
            <Chat socket={socket} roomId={roomId} user={displayName} />
          </div>
        </div>
      </div>
      {isPanelOpen && (
        <QuestionPanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onChangeQuestion={handleQuestionChange}
          complexity={complexity}
        />
      )}
    </div>
  );
};

export default Collaboration;
