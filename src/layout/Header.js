import React from "react";

function Header({ title }) {
  return (
    <div>
      <div className="container-fluid bg-dark text-light p-4">
        <h1 className="display-6">{title}</h1>
      </div>
    </div>
  );
}

export default Header;
