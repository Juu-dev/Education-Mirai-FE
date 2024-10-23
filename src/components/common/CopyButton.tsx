import { Tooltip, message } from 'antd';
import { Copy } from 'lucide-react';
import React from 'react';

export default function CopyButton({
  content,
  size = 16,
  color = 'black',
}: {
  content: string;
  size?: number;
  color?: string;
}) {
  const copyToClipboard = () => {
    const tempInput = document.createElement('input');
    tempInput.value = content;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    try {
      document.execCommand('copy');
      message.success(`copied`);
    } catch (err) {
      message.error(`${err} copy!`);
    }

    document.body.removeChild(tempInput);
  };

  return (
    <Tooltip title="Copy">
      <Copy className="cursor-pointer" size={size} onClick={copyToClipboard} color={color} />
    </Tooltip>
  );
}
