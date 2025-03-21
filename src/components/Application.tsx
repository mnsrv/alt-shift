import './Application.css';

type ApplicationProps = {
  text?: string;
};

export default function Application({ text }: ApplicationProps) {
  const placeholder = 'Your personalized job application will appear here...';
  return <div className="application">{text || placeholder}</div>;
}
