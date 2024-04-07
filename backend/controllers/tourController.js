import Tour from '../models/Tour.js';

// create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedTour,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create. Try again" });
    }
};

// update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
};

// delete tour 
export const deleteTour = async (req, res) => {
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
};

// get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate("reviews");

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found",
            });
        }
 
        res.status(200).json({
            success: true,
            data: tour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tour",
        });
    }
};

// get all tours
export const getAllTour = async (req, res) => {

    // for pagination
    const page = parseInt(req.query.page); // Using req.query.page for pagination

    console.log(page);

    try {
        const tours = await Tour.find({})
            .populate("reviews")
            .skip(page  * 8) // Assuming 10 items per page
            .limit(8); // Adjust the limit based on your requirements

        res.status(200).json({
            success: true,
            count: tours.length,
            message : "Successful",
            data: tours,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    }
};

//get tour by search
export const getTourBySearch = async (req, res) => {
    // here "i" means case sensitive
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    // Log the received query parameters
    console.log("Received Query Parameters:");
    console.log("City:", req.query.city);
    console.log("Distance:", req.query.distance);
    console.log("Max Group Size:", req.query.maxGroupSize);

    try {
        console.log("Search Query:", { city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } });

        //gte means greater than or equal
        const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } }).populate("reviews");

        // Log the found tours
        console.log("Found Tours:", tours);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tours,
        });
    } catch (err) {
        // Log any errors
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tour. See server logs for details.",
        });
    }
};

//get featured tour
export const getFeaturedTour = async (req, res) => {
   

    try {
        const tours = await Tour.find({ featured:true}).populate("reviews").limit(8);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tours,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    }
};

//get tour counts
export const getTourCount = async (req, res) => {
   try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tourCount });
   } catch(err) {
    res.status(500).json({ success: false, message: "failed to fetch" });

   }
};