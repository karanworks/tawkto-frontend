import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  UncontrolledTooltip,
} from "reactstrap";
import FeatherIcon from "feather-icons-react";

const CopyCode = ({ code, maxHeight = "300px" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="my-3">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <span>Widget Code</span>
        <Button
          id="copyButton"
          color="link"
          onClick={handleCopy}
          className="p-1"
        >
          {copied ? (
            <FeatherIcon icon="check" color="green" size={20} />
          ) : (
            <FeatherIcon icon="copy" size={20} />
          )}
        </Button>
        <UncontrolledTooltip placement="top" target="copyButton">
          {copied ? "Copied!" : "Copy to Clipboard"}
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>
        <pre
          className="bg-light p-3 rounded overflow-auto"
          style={{
            maxHeight,
            overflowY: "auto",
          }}
        >
          <code className="text-wrap d-block">{code}</code>
        </pre>
      </CardBody>
    </Card>
  );
};

export default CopyCode;
