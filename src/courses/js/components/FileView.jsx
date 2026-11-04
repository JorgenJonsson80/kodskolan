function FileView({ fileName, source }) {
  return (
    <figure className="lesson-file">
      <figcaption>{fileName}</figcaption>
      <pre>
        <code>{source}</code>
      </pre>
    </figure>
  );
}

export default FileView;
