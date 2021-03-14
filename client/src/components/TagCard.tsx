import React from 'react';
import { Tag } from '../models';

interface TagCardProps {
  tag: Tag;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const TagCard: React.FC<TagCardProps> = (props: TagCardProps) => {
  const { tag, color = 'gray', onClick = undefined } = props;

  return (
    <div
      className={`flex flex-col p-3 rounded-md bg-${color}-300 m-2 w-60 whitespace-normal break-words shadow-md ring-${color}-600 ring-4 ring-opacity-50 cursor-pointer`}
      onClick={onClick}
    >
      <div className="text-center flex-grow py-2">
        <div className="text-base font-medium m-2 tracking-wide">
          {tag.title || '-'}
        </div>
      </div>
      <div className="text-xxs">
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
