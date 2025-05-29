import AchivementRouter from "./allroutes/achievement.route.js";
import BookRouter from "./allroutes/book.route.js";
import ClubRouter from "./allroutes/club.route.js";
import DemandRouter from "./allroutes/demand.route.js";
import DepartmentRouter from "./allroutes/department.route.js";
import EventRouter from "./allroutes/event.route.js";
import express from "express";
import FestRouter from "./allroutes/fest.route.js";
import HostelRouter from "./allroutes/hostel.route.js";
import NotesRouter from "./allroutes/notes.route.js";
import PlacementRouter from "./allroutes/placement.route.js";
import PyqRouter from "./allroutes/pyq.route.js";
import ScholarshipRouter from "./allroutes/scholarship.route.js";
import StartupRouter from "./allroutes/startup.route.js";
import SuggestRouter from "./allroutes/suggest.route.js";
import UserRouter from "./allroutes/user.route.js";
import GalleryRouter from "./allroutes/gallery.route.js"



const router = express.Router();
router.get("/testing", (request, response) => {
    return response.status(200).send("Nested routing is working fine please move forward")
})

router.use("/achievement", AchivementRouter);
router.use("/book", BookRouter);
router.use("/club", ClubRouter);
router.use("/demand", DemandRouter);
router.use("/department", DepartmentRouter);
router.use("/event", EventRouter);     
router.use("/fest", FestRouter);
router.use("/hostel", HostelRouter);
router.use("/notes", NotesRouter);
router.use("/placement", PlacementRouter);
router.use("/pyq", PyqRouter);
router.use("/scholarship", ScholarshipRouter);
router.use("/startup", StartupRouter);
router.use("/suggest", SuggestRouter);
router.use("/user", UserRouter);
router.use("/gallery",GalleryRouter);

export default router;
