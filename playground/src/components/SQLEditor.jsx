import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
export default function SQLEditor({ code, setCode }) {
  return (
    <Editor
      value={code}
      onValueChange={setCode}
      highlight={(c) => Prism.highlight(c, Prism.languages.sql, "sql")}
      padding={10}
      style={{ fontFamily: "monospace", fontSize: 14, background: "#000000" }}
    />
  );
}
