import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/github-dark.css"
import Scode from "./scode"
import { Components } from "react-markdown"

type ScodeType = "warning" | "info" | "success" | "destructive"
type ScodeSize = "sm" | "md" | "lg"

function preprocessMarkdown(markdownContent: string) {
  const result: (string | JSX.Element)[] = []
  let lastIndex = 0
  
  const regex = /\[scode(?:\s+type="([^"]*)")?(?:\s+size="([^"]*)")?\]([\s\S]*?)\[\/scode\]/g
  let match
  
  while ((match = regex.exec(markdownContent)) !== null) {

    if (match.index > lastIndex) {
      result.push(markdownContent.slice(lastIndex, match.index))
    }
    
    const type = (match[1] || "info") as ScodeType
    const size = (match[2] || "md") as ScodeSize
    const scodeContent = match[3]
    
    result.push(
      <Scode key={match.index} type={type} size={size}>
        {scodeContent}
      </Scode>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  if (lastIndex < markdownContent.length) {
    result.push(markdownContent.slice(lastIndex))
  }
  
  return result
}

export default function MarkdownRender({ content }: { content: string }) {
  const components = {
    img: ({node, ...props}) => (
      <img
        {...props}
        className="rounded-xl mx-auto shadow-lg max-w-full h-auto"
        style={{ maxHeight: 480, objectFit: "contain" }}
        alt={props.alt || ""}
      />
    ),
    pre: ({node, ...props}) => (
      <pre
        {...props}
        className="rounded-xl p-4 overflow-x-auto shadow-lg my-6"
        style={{ fontSize: 15, lineHeight: 1.7 }}
      />
    ),
    code: ({node, ...props}) => (
      <code
        {...props}
        className="font-mono text-sm bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5"
      />
    ),
  } as Components

  const processedContent = preprocessMarkdown(content)

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-lg prose-img:max-w-[90%]">
      {processedContent.map((part, index) => {
        if (React.isValidElement(part)) {
          return part
        }
        return (
          <ReactMarkdown
            key={index}
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {String(part)}
          </ReactMarkdown>
        )
      })}
      <style jsx global>{`
        .hljs, .prose pre, .prose pre code {
          background: #23272e !important;
          color: #fff !important;
        }
        .prose pre {
          border-radius: 0.75rem;
          padding: 1.2em 1em;
          font-size: 15px;
          line-height: 1.7;
          overflow-x: auto;
          margin: 1.5em 0;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
        }
        .prose code {
          font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', 'Consolas', monospace;
        }
        .prose pre::-webkit-scrollbar {
          height: 8px;
          background: #23272e;
        }
        .prose pre::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
