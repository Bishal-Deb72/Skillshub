import React, { useContext, useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'; // Missing Quill CSS import
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddCourse() {

  const {backendUrl, getToken} = useContext(AppContext)
  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapter, setChapter] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false
  })

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapter.length > 0 ? chapter[chapter.length - 1].chapterOrder + 1 : 1,
        };
        setChapter([...chapter, newChapter])
      }
    } else if (action === 'remove') {
      setChapter(chapter.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapter(
        chapter.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      )
    }
  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true)
    } else if (action === 'remove') {
      setChapter(
        chapter.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updatedContent = [...chapter.chapterContent]
            updatedContent.splice(lectureIndex, 1)
            return { ...chapter, chapterContent: updatedContent }
          }
          return chapter;
        })
      )
    }
  }

  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
      alert('Please fill all lecture details');
      return;
    }

    setChapter((prevChapters) =>
      prevChapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length + 1,
            lectureId: uniqid(),
          };

          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }
        return chapter;
      })
    );

    // Reset the lecture form and close the popup
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault()
    // Add your submission logic here
    // console.log({
    //   courseTitle,
    //   coursePrice,
    //   discount,
    //   image,
    //   chapter,
    //   description: quillRef.current?.root.innerHTML
    // });
    try {
      e.preventDefault();
      if(!image){
        toast.error('Thumbnail Not Selected')
      }

      const courseData = {
        courseTitle,
        courseDescription:quillRef.current.root.innerHTML,
        coursePrice:Number(coursePrice),
        discount:Number(discount),
        courseContent:chapter,
      }
      const formData = new FormData()
      formData.append('courseData',JSON.stringify(courseData))
      formData.append('image',image)

      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/educator/add-course',formData,{headers:{Authorization:`Bearer ${token}`}})

      if(data.success){
        toast.success(data.message)
        setCourseTitle('')
        setCoursePrice(0)
        setDiscount(0)
        setImage(null)
        setChapter([])
        quillRef.current.root.innerHTML = ""
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    // Initialize Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
          ]
        },
        placeholder: 'Write course description here...',
      });
    }
  }, [])

  return (
    <div className='h-screen overflow-auto flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-4xl w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input
            onChange={e => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder='Type here'
            className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500'
            required
          />
        </div>
        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef} className='h-64 mb-4'></div>
        </div>
        <div className='flex flex-col gap-1'>
          <p>Course Price</p>
          <input
            onChange={e => setCoursePrice(e.target.value)}
            value={coursePrice}
            type="number"
            placeholder='0'
            min="0"
            className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
            required
          />
          <div className='flex md:flex-row flex-col items-center gap-3 mt-2'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3 cursor-pointer'>
              <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded' />
              <input
                type="file"
                id='thumbnailImage'
                onChange={e => setImage(e.target.files[0])}
                accept='image/*'
                hidden
                required
              />
              {image && <span className='text-sm'>{image.name}</span>}
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Discount (%)</p>
          <input
            onChange={e => setDiscount(e.target.value)}
            value={discount}
            type="number"
            placeholder='0'
            min={0}
            max={100}
            className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
            required
          />
        </div>

        {/* Adding Chapters and lectures */}
        <div className='mt-4'>
          {chapter.map((chapterItem, chapterIndex) => (
            <div key={chapterItem.chapterId} className='bg-white border rounded-lg mb-4'>
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                  <img
                    onClick={() => handleChapter('toggle', chapterItem.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                    className={`mr-2 cursor-pointer transition-all ${chapterItem.collapsed && "-rotate-90"}`}
                  />
                  <span className='font-semibold'>{chapterIndex + 1}. {chapterItem.chapterTitle}</span>
                </div>
                <span className='text-gray-500'>{chapterItem.chapterContent.length} Lectures</span>
                <img
                  onClick={() => handleChapter('remove', chapterItem.chapterId)}
                  src={assets.cross_icon}
                  alt=""
                  className='cursor-pointer w-4 h-4'
                />
              </div>
              {!chapterItem.collapsed && (
                <div className='p-4'>
                  {chapterItem.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lecture.lectureId} className='flex justify-between items-center mb-2'>
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                        <a href={lecture.lectureUrl} target='_blank' rel='noopener noreferrer' className='text-blue-500 ml-1'>
                          Link
                        </a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                      </span>
                      <img
                        src={assets.cross_icon}
                        alt=""
                        className='cursor-pointer w-3 h-3'
                        onClick={() => handleLecture('remove', chapterItem.chapterId, lectureIndex)}
                      />
                    </div>
                  ))}
                  <button
                    type='button'
                    className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2 hover:bg-gray-200'
                    onClick={() => handleLecture('add', chapterItem.chapterId)}
                  >
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type='button'
            className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer mt-2 hover:bg-blue-200 w-full'
            onClick={() => handleChapter('add')}
          >
            + Add Chapter
          </button>

          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
              <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-md'>
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>
                <div className='mb-4'>
                  <p className='mb-1'>Lecture Title</p>
                  <input
                    type="text"
                    className='mt-1 block w-full border rounded py-2 px-3'
                    value={lectureDetails.lectureTitle}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <p className='mb-1'>Duration (minutes)</p>
                  <input
                    type="number"
                    min="1"
                    className='mt-1 block w-full border rounded py-2 px-3'
                    value={lectureDetails.lectureDuration}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <p className='mb-1'>Lecture URL</p>
                  <input
                    type="url"
                    className='mt-1 block w-full border rounded py-2 px-3'
                    value={lectureDetails.lectureUrl}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                    required
                  />
                </div>
                <div className='mb-4 flex items-center'>
                  <input
                    type="checkbox"
                    id="previewFree"
                    className='mr-2 scale-125'
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                  />
                  <label htmlFor="previewFree">Is Preview Free?</label>
                </div>
                <button
                  type='button'
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
                  onClick={addLecture}
                >
                  Add Lecture
                </button>
                <img
                  onClick={() => setShowPopup(false)}
                  src={assets.cross_icon}
                  alt="Close"
                  className='absolute top-4 right-4 w-4 cursor-pointer'
                />
              </div>
            </div>
          )}
        </div>
        <button
          type='submit'
          className='bg-black text-white w-full py-2.5 px-8 rounded my-4 hover:bg-gray-800'
        >
          ADD COURSE
        </button>
      </form>
    </div>
  )
}

export default AddCourse