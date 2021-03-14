import React from 'react';
import { Tag } from '../../models';

interface TagCardProps {
  tag: Tag;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  // eslint-disable-next-line
  onClickPlay?: any;
}

const TagCard: React.FC<TagCardProps> = (props: TagCardProps) => {
  const {
    tag,
    color = 'gray',
    onClick = undefined,
    onClickPlay = undefined,
  } = props;

  return (
    <div
      className={`flex flex-col p-3 rounded-md bg-${color}-300 m-2 w-60 whitespace-normal break-words shadow-md ring-${color}-600 ring-4 ring-opacity-50 cursor-pointer`}
    >
      <div className={`flex-grow py-2`}>
        <div
          className={`flex flex-col text-center justify-center hover:bg-${color}-200 hover:rounded-full`}
        >
          <div
            className="text-base font-medium m-2 tracking-wide"
            onClick={onClickPlay ? () => onClickPlay(tag) : undefined}
          >
            {tag.title || '-'}
          </div>
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="green"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-play-circle"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div className="text-xxs" onClick={onClick}>
        <div>
          <span className="font-bold capitalize">{tag.platform || '-'}</span>
        </div>
        <div>
          <span className="font-medium">Music ID</span> <br />
          {tag.musicId || '-'}
        </div>
        <div>
          <span className="font-medium">Tag ID</span> <br />
          {tag.tagId || '-'}
        </div>
      </div>
    </div>
  );
};

export default TagCard;
