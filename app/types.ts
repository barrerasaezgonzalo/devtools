type FAQ = {
  question: string;
  answer: string;
};
export interface Tool {
  slug: string;
  name: string;
  description: string;
  component?: React.ComponentType;
  faqs?: FAQ[];
  category: string;
}

export interface ToolCardProps {
  tool: Tool;
}

export interface ToolStatus {
  type: "success" | "error";
  msg: string;
}
