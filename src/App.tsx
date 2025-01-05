import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchPosts } from './redux/slices/postSlice';

import './App.css'

import { SearchForm } from './components/searchForm';
import { PostsTable } from './components/postsTable';
import { AddPostForm } from './components/addPostsForm';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Loading posts...</p>;
  }

  return (
    <>
      <SearchForm/>
      <PostsTable/>
      <AddPostForm/>
    </>
  )
}

export default App
