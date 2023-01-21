import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [post, setPost] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error on fetching post!");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={post._id}
        user={post.user}
        tags={post.tags}
        title={post.title}
        imageUrl={post.imageUrl ? `http://localhost:4000${post.imageUrl}` : ""}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        isFullPost
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "John Doe",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Some random comment",
          },
          {
            user: {
              fullName: "John Doe 2",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "Testing comment",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
