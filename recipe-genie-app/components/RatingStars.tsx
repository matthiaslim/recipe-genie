import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-paper";

const Stars = React.memo(({ count }: { count: number }) => {
    const totalStars = 5;
    const filledStars = Array(count).fill(<Icon source="star" size={16} />);
    const emptyStars = Array(totalStars - count).fill(<Icon source="star-outline" size={16} />);

    return (
        <View style={{ flexDirection: 'row' }}>
            {filledStars.map((star, index) => (
                <React.Fragment key={`filled-${index}`}>{star}</React.Fragment>
            ))}
            {emptyStars.map((star, index) => (
                <React.Fragment key={`empty-${index}`}>{star}</React.Fragment>
            ))}
        </View>
    );
});

export default Stars;