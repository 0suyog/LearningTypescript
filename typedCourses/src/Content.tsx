import type { CoursePart } from "../types";
import { Part } from "./Part";

interface ContentProp {
    courses: CoursePart[];
}

export const Content = (props: ContentProp) => {
    return (
        <>
            {props.courses.map((part) => {
                return <Part coursePart={part} />;
            })}
        </>
    );
};
