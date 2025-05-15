import type { CoursePart } from "../types";
import { assertNever } from "../utils";
export const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.kind) {
        case "basic":
            return (
                <div>
                    <strong>
                        {coursePart.name} {coursePart.exerciseCount}
                    </strong>
                    <p>{coursePart.description}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <strong>
                        {coursePart.name} {coursePart.exerciseCount}
                    </strong>
                    <p>{coursePart.description}</p>
                    <p>
                        submit to{" "}
                        <a href={coursePart.backgroundMaterial}>Submit</a>
                    </p>
                </div>
            );
        case "group":
            return (
                <div>
                    <strong>
                        {coursePart.name} {coursePart.exerciseCount}
                    </strong>
                    <p>project exercises {coursePart.groupProjectCount}</p>
                </div>
            );
        case "special":
            return (
                <div>
                    <strong>
                        {coursePart.name} {coursePart.exerciseCount}{" "}
                    </strong>
                    <p>{coursePart.description}</p>
                    <p>
                        required skills:{" "}
                        {coursePart.requirements.map((req) => (
                            <span>{req} </span>
                        ))}
                    </p>
                </div>
            );
        default:
            assertNever(coursePart);
    }
};
