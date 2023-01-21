import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
            isPostsLoading ? (
              <Post key={index} />
            ) : (
              <Post
                id={post._id}
                key={post._id}
                user={post.user}
                tags={post.tags}
                title={post.title}
                imageUrl={
                  post.imageUrl ? `http://localhost:4000${post.imageUrl}` : ""
                }
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                isEditable={userData?._id === post.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
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
          />
        </Grid>
      </Grid>
    </>
  );
};
