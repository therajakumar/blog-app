import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getUserData } from "@/lib/user";
import axios from "axios";
import { User } from "lucide-react";
import PropTypes from "prop-types";
import { toast } from "sonner";

CommentCard.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

export default function CommentCard({
  name,
  rating,
  userName,
  text,
  commentId,
}) {
  const totalStars = 5;

  const { userid, name: username } = getUserData();

  // Generate an array of star components based on the rating
  const stars = Array.from({ length: totalStars }, (_, index) => {
    if (index < rating) {
      return <StarIcon className="w-5 h-5 fill-primary" key={index} />;
    } else {
      return (
        <StarIcon
          className="w-5 h-5 fill-muted stroke-muted-foreground"
          key={index}
        />
      );
    }
  });

  async function deleteComment() {
    const backendURL = import.meta.env.VITE_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.delete(`${backendURL}/comment/delete`, {
        data: { commentId, authorId: userid },
      });
      if (res.status === 200) {
        console.log("Comment deleted successfully");
      } else {
        console.log("Failed to delete comment");
      }
      toast.success("Succesfully your comment is deleted");
      window.location.reload(false);
    } catch (error) {
      toast.error(error);
      console.error("Error deleting comment:", error);
    }
  }

  return (
    <Card className="w-full p-6 grid gap-6 my-5">
      <div className="flex items-start gap-4 relative">
        <User className="w-10 h-10  border-[1px] rounded-full p-1" />
        <div className="grid gap-2 flex-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">{stars}</div>
            <span className="text-sm text-muted-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{name}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>@{userName}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={
            "absolute top-0 right-0" + (username !== userName ? " hidden" : "")
          }
          disabled={username !== userName}
          onClick={deleteComment}
        >
          <XIcon className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
      <p className="text-muted-foreground">{text}</p>
    </Card>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
