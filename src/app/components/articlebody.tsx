import { Fragment, ReactNode } from "react";

/**
 * Renders an article body written in the /write editor.
 * Supported formatting (one block per line):
 *   ## Heading         -> section heading
 *   1. Item            -> numbered list item
 *   - Item             -> bullet list item
 *   blank line         -> spacer
 *   anything else      -> paragraph
 * Inline: **bold**, *italic*, and bare http(s) links.
 */
export default function ArticleBody({ body }: { body: string }) {
    const lines = body.replace(/\r\n/g, "\n").split("\n");
    const blocks: ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line === "") {
            blocks.push(<p key={i}><br /></p>);
        } else if (line.startsWith("## ")) {
            blocks.push(<h2 key={i}>{inline(line.slice(3))}</h2>);
        } else if (/^\d+\.\s/.test(line) || /^[-*]\s/.test(line)) {
            const ordered = /^\d+\.\s/.test(line);
            const pattern = ordered ? /^\d+\.\s/ : /^[-*]\s/;
            const items: ReactNode[] = [];
            const start = i;
            while (i < lines.length && pattern.test(lines[i].trim())) {
                // Keep the number in the text, matching the existing articles' lists.
                const text = ordered ? lines[i].trim() : lines[i].trim().replace(pattern, "");
                items.push(<li key={i}><p>{inline(text)}</p></li>);
                i++;
            }
            i--;
            blocks.push(ordered ? <ol key={start}>{items}</ol> : <ul key={start}>{items}</ul>);
        } else {
            blocks.push(<p key={i} style={{ whiteSpace: "pre-wrap" }}>{inline(line)}</p>);
        }
    }

    return <>{blocks}</>;
}

function inline(text: string): ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/\S+)/g);
    return parts.map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (/^\*[^*]+\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
        if (/^https?:\/\//.test(part)) return <a key={i} href={part} className="underline">{part}</a>;
        return <Fragment key={i}>{part}</Fragment>;
    });
}
