import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  getQuestionDetails,
  deleteQuestion,
} from '../../../api/QuestionApi.js';
import { showSuccessToast } from '../../../utils/toast.js';
import { DeletionWindow } from '../../../components/ConfirmationWindow/ConfirmationWindows.js';
import { errorHandler } from '../../../utils/errors.js';
import './QuestionDescription.css';
import '../../../css/Tags.css';
import Header from '../../../components/Header.js';
import { getCookie, getIsMaintainer } from '../../../utils/helpers.js';

const QuestionDescription = () => {
  const [titleValue, setTitleValue] = useState('');
  const [complexityValue, setComplexityValue] = useState('');
  const [tagsValue, setTagsValue] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [isDeletionWindowOpen, setDeletionWindowOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintainer, setIsMaintainer] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await getQuestionDetails(id, getCookie());
        setTitleValue(question.title);
        setComplexityValue(question.complexity);
        setTagsValue(question.tags);
        const sanitizedDescription = DOMPurify.sanitize(question.description);
        setDescriptionValue(sanitizedDescription);
        setIsLoading(false);
      } catch (error) {
        navigate('../');
        errorHandler(error);
      }
    };

    const fetchIsMaintainer = async () => {
      const isMaintainerValue = await getIsMaintainer();
      setIsMaintainer(isMaintainerValue);
    };

    fetchData();
    fetchIsMaintainer();
  }, [id, navigate]);

  const handleBackClick = () => {
    navigate('../');
  };

  const handleEditClick = () => {
    navigate('../edit/' + id);
  };

  const handleDeleteClick = () => {
    setDeletionWindowOpen(true);
  };

  const handleConfirmDeletion = async () => {
    setDeletionWindowOpen(false);
    try {
      await deleteQuestion(id, getCookie());
      showSuccessToast('Successfully Deleted!');
      navigate('../');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeletionWindowClose = () => {
    setDeletionWindowOpen(false);
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Easy':
        return 'bg-success';
      case 'Medium':
        return 'bg-warning';
      case 'Hard':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

  const RenderTags = () => {
    return tagsValue?.map((tag, index) => {
      return (
        <span key={index} className='badge bg-secondary'>
          {tag}
        </span>
      );
    });
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      ) : (
        <div className='body'>
          <div className='container'>
            <div className='card text-center'>
              <div className='card-header'>
                <div className='d-flex justify-content-between'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={handleBackClick}>
                    Back
                  </button>
                  {isMaintainer ? (
                    <div>
                      <button
                        type='button'
                        className='btn btn-primary me-2'
                        onClick={handleEditClick}>
                        Edit
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={handleDeleteClick}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className='card-body'>
                <h1 className='card-title'>{titleValue}</h1>
                <div
                  className='scrollable-div'
                  dangerouslySetInnerHTML={{ __html: descriptionValue }}></div>
              </div>
              <div className='card-footer d-flex'>
                <div className='d-flex flex-wrap gap-1'>{RenderTags()}</div>
                <div className='ms-auto'>
                  <span
                    className={`badge ${getComplexityColor(complexityValue)}`}>
                    {complexityValue}
                  </span>
                </div>
              </div>
            </div>
            {isDeletionWindowOpen && (
              <DeletionWindow
                onConfirm={handleConfirmDeletion}
                onClose={handleDeletionWindowClose}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDescription;
