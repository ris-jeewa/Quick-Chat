import React from "react";

const Input = () => {
  return (
    <div className="input">
      <div className="left">
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBsdXMiPjxwYXRoIGQ9Ik01IDEyaDE0Ii8+PHBhdGggZD0iTTEyIDV2MTQiLz48L3N2Zz4="
            alt=""
          />
        </label>
        <input
          type="text"
          placeholder="Type something..."
          style={{ width: "100%" }}
        />
      </div>
      <div className="send">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4MDgwODEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1wYXBlcmNsaXAiPjxwYXRoIGQ9Im0yMS40NCAxMS4wNS05LjE5IDkuMTlhNiA2IDAgMCAxLTguNDktOC40OWw4LjU3LTguNTdBNCA0IDAgMSAxIDE4IDguODRsLTguNTkgOC41N2EyIDIgMCAwIDEtMi44My0yLjgzbDguNDktOC40OCIvPjwvc3ZnPg=="
          alt=""
        />

        <button>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MDA4NzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZW5kIj48cGF0aCBkPSJtMjIgMi03IDIwLTQtOS05LTRaIi8+PHBhdGggZD0iTTIyIDIgMTEgMTMiLz48L3N2Zz4="
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Input;
