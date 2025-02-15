export const getUserProfile = async (req, res) => {
    try {
      // req.user is populated from the `protectRoute` middleware
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  