import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("https://jsonplaceholder.typicode.com/posts/" + id);

  const history = useHistory();

  const deleteOnClick = () => {
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + blog.id)
      .then((response) => {
        console.log(response.status);
        history.push("/");
      });
  };

  const goToEdit = () => {
    history.push("/edit/" + blog.id);
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.userId}</p>
          <div>{blog.body}</div>
          <button onClick={goToEdit}>edit</button>
          <button onClick={deleteOnClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
