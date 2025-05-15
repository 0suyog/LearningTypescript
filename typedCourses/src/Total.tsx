interface TotalProps {
    total: number;
}

export const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.total}</p>;
};
