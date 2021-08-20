import React from 'react';

interface EmptyTagCardProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const TagCard: React.FC<EmptyTagCardProps> = (props: EmptyTagCardProps) => {
  const { onClick = undefined } = props;

  return (
    <div
      className="flex items-center justify-center p-3 rounded-md bg-gray-100 m-2 max-w-60 w-60 shadow-inner text-center ring-gray-600 ring-4 ring-opacity-50 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="gray"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-plus-square"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
        <div className="text-xs pt-2 font-semibold text-gray-500">
          Add New Music Card
        </div>
      </div>
    </div>
  );
};

export default TagCard;
