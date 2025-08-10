import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldCard from "./FieldCard";
import type { FormField } from "../../types/FormField";

type Props = {
  field: FormField;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEditing?: boolean;
  onLabelChange?: (id: string, newLabel: string) => void;
};

const SortableFieldCard: React.FC<Props> = ({
  field,
  onEdit,
  onDelete,
  isEditing,
  onLabelChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FieldCard
        field={field}
        onEdit={onEdit}
        onDelete={onDelete}
        isEditing={isEditing}
        onLabelChange={onLabelChange}
      />
    </div>
  );
};

export default SortableFieldCard;
