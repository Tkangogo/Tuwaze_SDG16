function getGenderCount(users) {
    return users.reduce((count, user) => {
        if (user.gender === "male") count.male += 1;
        if (user.gender === "female") count.female += 1;
        return count;
    }, { male: 0, female: 0 });
}

module.exports = {getGenderCount};