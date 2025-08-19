export const signup = (req, res) => {
    const{ name, email, password, profilePicture } = req.body;
    try{

    }catch (error) {
    }
};

export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};

