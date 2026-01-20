import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/github-dark.css"
import Scode from "./scode"
import { Components } from "react-markdown"
import { MarkdownContainer } from "./ui/animate/markdown-container"

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
    img: ({ node, ...props }) => (
      <img
        {...props}
        className="rounded-xl mx-auto shadow-sm border border-border/50 max-w-full h-auto my-8 transition-transform hover:scale-[1.01]"
        style={{ maxHeight: 560, objectFit: "contain" }}
        alt={props.alt || ""}
      />
    ),
    pre: ({ node, ...props }) => (
      <pre
        {...props}
        className="rounded-xl p-5 overflow-x-auto my-8 bg-muted/50 border border-border/50 text-sm leading-relaxed"
      />
    ),
    code: ({ node, ...props }) => {
      // If the code is inside a pre (block code), let pre handle the styling mostly
      // React-markdown passes inline boolean if it's inline, but we can check props
      const isInline = !props.className;
      return (
        <code
          {...props}
          className={isInline
            ? "font-mono text-[0.9em] bg-muted/60 text-primary px-1.5 py-0.5 rounded mx-0.5 border border-border/40"
            : "font-mono bg-transparent text-foreground/90 p-0 rounded-none border-none"
          }
        />
      )
    },
  } as Components

  const processedContent = preprocessMarkdown(content)

  // ... existing imports

  // ... inside function
  return (
    <MarkdownContainer className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-lg prose-img:max-w-[90%]">
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
        .hljs {
          background: transparent !important;
        }
        /* Custom scrollbar for code blocks */
        .prose pre::-webkit-scrollbar {
          height: 6px;
          background-color: transparent;
        }
        .prose pre::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
        }
        .prose pre::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </MarkdownContainer>
  )
}
