export const Loading = () => {
  return (
    <section
      className="loading-page"
      style={{
        backgroundColor: "rgb(223, 208, 208)",
        color: "black",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "5%",
      }}
    >
      <div
        style={{
          color: "rgb(185, 151, 151)",
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        <p>Loading...</p>
        <div
          className="spinner-border"
          role="status"
          style={{ color: "rgb(185, 151, 151)" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </section>
  );
};
