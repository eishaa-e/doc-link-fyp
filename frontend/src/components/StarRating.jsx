import React, {useState} from "react";
import Star from "./Star";

const StarRating = ({rating, onRatingChange}) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    filled={star <= (hover || rating)}
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                />
            ))}
        </div>
    );
};

export default StarRating;
