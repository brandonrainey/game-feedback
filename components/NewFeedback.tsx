import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Post } from '../types/data'

interface NewFeedbackProps {
  openNewFeedback: boolean
  setOpenNewFeedback: React.Dispatch<React.SetStateAction<boolean>>
  suggestionsData: Post[]
  setSuggestionsData: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function NewFeedback({
  openNewFeedback,
  setOpenNewFeedback,
  suggestionsData,
  setSuggestionsData,
}: NewFeedbackProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const changeType = 'Add'

  const [isOpen, setIsOpen] = useState(false)

  const [isEmpty, setIsEmpty] = useState(true)

  const [textError, setTextError] = useState(false)

  const [dropValue, setDropValue] = useState('')

  const [newFeedback, setNewFeedback] = useState<any>({
    title: '',
    category: '',
    upvotes: 1,
    status: '',
    description: '',
    name: session?.user?.name,
    comments: [],
    upvotedBy: [session?.user?.name],
  })

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (value: string) => {
    setDropValue(value)
    let copyObj = newFeedback
    copyObj.category = value
    setNewFeedback(copyObj)
    setIsOpen(false)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let copyObj = newFeedback
    copyObj.title = e.target.value
    setNewFeedback(copyObj)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value === '') {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
      setTextError(false)
    }

    let copyObj = newFeedback
    copyObj.description = e.target.value
    setNewFeedback(copyObj)
  }

  const addFeedback = async (feedback: any) => {
    if (isEmpty) {
      setTextError(true)
    } else {
      try {
        const response = await fetch('https://game-feedback.netlify.app/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ feedback, changeType }),
        })

        const data = await response.json()

        if (response.ok) {
          const feedbackUpdate = newFeedback
          feedbackUpdate._id = data.newId
          setNewFeedback(feedbackUpdate)

          setSuggestionsData([...suggestionsData, newFeedback])
          setOpenNewFeedback(false)
          router.push('/')
        }
      } catch (error) {
        console.error('Error adding feedback:', error)
      }
    }
  }

  return (
    <div className="newFeedbackContainer">
      <div className=''>
        <img src="/shared/icon-arrow-left.svg" />
        <button className='newFeedbackGoBack' onClick={() => setOpenNewFeedback(false)}>Go Back</button>
      </div>

      <div className="formContainer">
        <img
          src="/shared/icon-new-feedback.svg"
          alt=""
          className="newFeedbackIcon"
        />

        <h1>Create New Feedback</h1>
        <div className="formItemWrapper">
          <h2>Feedback Title</h2>
          <p>Add a short, descriptive headline</p>
          <input onChange={handleTitleChange}></input>
        </div>

        <div className="formItemWrapper">
          <h2>Category</h2>
          <p>Choose a category for your feedback</p>
          <button
            className={`${isOpen ? 'open' : ''} categoryDropdownButton`}
            onClick={toggleDropdown}
          >
            {dropValue}
            <img
              src={
                isOpen
                  ? '/shared/icon-arrow-up.svg'
                  : '/shared/icon-arrow-down.svg'
              }
            />
          </button>
          {isOpen && (
            <ul className="categoryDropdown">
              <li onClick={() => handleMenuItemClick('Feature')}>
                Feature
                {dropValue === 'Feature' && (
                  <img className="check" src="/shared/icon-check.svg" />
                )}
              </li>
              <li onClick={() => handleMenuItemClick('UI')}>
                UI
                {dropValue === 'UI' && (
                  <img className="check" src="/shared/icon-check.svg" />
                )}
              </li>
              <li onClick={() => handleMenuItemClick('UX')}>
                UX
                {dropValue === 'UX' && (
                  <img className="check" src="/shared/icon-check.svg" />
                )}
              </li>
              <li onClick={() => handleMenuItemClick('Enhancement')}>
                Enhancement
                {dropValue === 'Enhancement' && (
                  <img className="check" src="/shared/icon-check.svg" />
                )}
              </li>
              <li onClick={() => handleMenuItemClick('Bug')}>
                Bug
                {dropValue === 'Bug' && (
                  <img className="check" src="/shared/icon-check.svg" />
                )}
              </li>
            </ul>
          )}
        </div>

        <div className="formItemWrapper">
          <h2>Feedback Detail</h2>
          <p>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            className={`feedbackDetail ${textError && 'empty'}`}
            onChange={handleDescriptionChange}
          ></textarea>
          {textError && <p className="errorMessage">Cant be Empty</p>}
        </div>

        <div className="buttonWrapper">
          <button
            onClick={() => setOpenNewFeedback(false)}
            className="cancelButton"
          >
            Cancel
          </button>
          <button
            onClick={() => addFeedback(newFeedback)}
            className="addButton"
          >
            Add Feedback
          </button>
        </div>
      </div>
    </div>
  )
}
