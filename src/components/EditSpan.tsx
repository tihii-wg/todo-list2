import { ChangeEvent, useState, KeyboardEvent } from "react";


export type EditSpanPropsType = {
	title: string
	setNewItem: (newTitle: string) => void
}
export function EditSpan(props: EditSpanPropsType) {
	const [editMode, setEditMode] = useState(false);
	const [title, setTitle] = useState("")

	const editModeHandler = () => {
		setEditMode(true);
		setTitle(props.title);
	};
	const viewModeHandler = () => {
		setEditMode(false);
		props.setNewItem(title);
	};
	const enterViewModeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setEditMode(false);
			props.setNewItem(title);
		}
	};

	const onChangeTitleHandдer = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }

	return (
		editMode
			? <input value={title} onKeyDown={enterViewModeHandler} onChange={onChangeTitleHandдer} onBlur={viewModeHandler} autoFocus />
			: <span onDoubleClick={editModeHandler} >{props.title}</span>
	)
}

