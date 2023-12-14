import ErrorPage from "../ErrorPage/ErrorPage";

function PageNotFound() {
  return (
    <ErrorPage status="404" message="Страница не найдена" />
  );
}

export default PageNotFound;
