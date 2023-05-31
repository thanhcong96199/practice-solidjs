interface IButtonProps {
  onAction?: () => void;
  title: string
}
export default function Button({ onAction, title }: IButtonProps) {
  
  return (
    <button class="bg-blue-600 text-white mt-6 border rounded-md p-2" onClick={() => onAction && onAction()}>
      {title}
    </button>
  );
}
