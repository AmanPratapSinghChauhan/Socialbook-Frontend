import { useRef, useEffect, useState } from 'react';
import PostCard from './PostCard';
import './Middlewar.css';
import { getAllPostsAPI } from '../ServerAPI';

const Middlebar = () => {

  const [pics, setPics] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const middleRef = useRef(null);
  const firstRender = useRef(true);

  const fetchPosts = async () => {
    if (!hasMore) return; // prevent duplicate calls
    setLoading(true);

    const res = await getAllPostsAPI(2, page);
    const data = res.data;
    if (data.status) {

      setPics((prev) => [...prev, ...data.post]);
      if (data.post.length == 2) {
        setHasMore(true);
        setLoading(false);
      }
    }
  };

  // First load
  useEffect(() => {
    if (firstRender.current) {
    firstRender.current = false;
    return; // skip on first render
  }
      fetchPosts();
  }, [page]);

  // Scroll listener
  useEffect(() => {
    const middleDiv = middleRef.current;

    if (!middleDiv) return;
    const handleScroll = () => {
      console.log("Handle scroll running");
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading && hasMore
      ) {
        // Load next page if available

        setPage((prev) => prev + 1);

      }
    };

    middleDiv.addEventListener("scroll", handleScroll);
    return () => middleDiv.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);


  const postCreate = (pic) => {
    return (
      <PostCard postInfo={pic} />
    )
  }


  return (<>
    {pics.length == 0
      ? <div></div>
      : <div ref={middleRef} className='middle-bar'>
        {pics?.slice()?.map(postCreate)}
      </div>
    }

  </>)
}

export default Middlebar;