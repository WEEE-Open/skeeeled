import CommentObj from "../entities/CommentObj";
import CourseObj from "../entities/CourseObj";
import QuestionObj from "../entities/QuestionObj";
import ReplyObj from "../entities/ReplyObj";
import DiscussionObj from "../entities/DiscussionObj";

const prefix = "http://localhost:8000/v1";

// header API
const postLogout = async () => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/logout", { method: "POST" })
      .then((res) => {
        if (res.ok) {
          resolve(null);
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => {
        reject("Server Error");
      });
  });
};

// user API
const getUser = async (userID) => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/user?user_id=" + userID)
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject("Generic Error"));
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

// Courses related APIs
const getMyCourses = async (userID, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/myCourses?user_id=" + userID + "&page=" + page + 
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        }
        res
          .json()
          .then((json) =>
            resolve(json.map((myCourses) => CourseObj.from(myCourses)))
          )
          .catch((err) => reject("Generic Error"));
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getCourses = async () => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/courses")
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.map((courses) => CourseObj.from(courses)))
            )
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getCourse = async (courseId) => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/course?course_id=" + courseId)
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error " + res.status);
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getQuestion = async (questionId) => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/question?question_id=" + questionId)
      .then((res) => {
        if (res.status === 404) {
          resolve({});
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error " + res.status + " " + res.statusText);
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getQuestions = async (courseId, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/questions?course_id=" + courseId + "&page=" + page + 
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getComment = async (commentId) => {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/comment?comment_id=${commentId}`)
      .then((res) => {
        if (res.status === 404) {
          resolve({});
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject(`Generic Error ${res.status} ${res.statusText}`);
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getDiscussions = async (questionId, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/discussion?question_id=" + questionId + "&page=" + page + 
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getMyQuestions = async (user_id, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/myQuestions?user_id=" + user_id + "&page=" + page + 
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getMyComments = async (user_id, page = 1, itemsPerPage = 1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/myComments?user_id=" + user_id + "&page=" + page + 
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.map((comments) => CommentObj.from(comments)))
            )
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getMyReplies = async (user_id, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/myReplies?user_id=" +  user_id + "&page=" + page +
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getReplies = async (comment_id, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/replies?comment_id=" + comment_id + "&page=" + page +
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const searchCourses = async (query, limit = 10) => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/searchCourses?query=" + query + "&limit=" + limit)
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.status === 500) {
          resolve([]);
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.map((courses) => CourseObj.from(courses)))
            )
            .catch((err) => reject("Generic Error"));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const searchQuestion = async (query, course_id) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/searchQuestions?query=" + query + "&course_id=" + course_id
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.status === 500) {
          resolve([]);
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.map((questions) => QuestionObj.from(questions)))
            )
            .catch((err) => reject("Generic Error"));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const searchDiscussion = async (query, question_id) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/searchDiscussion?query=" + query + 
      "&question_id=" + question_id
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.status === 500) {
          resolve([]);
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(
                json.map((discussions) => DiscussionObj.from(discussions))
              )
            )
            .catch((err) => reject("Generic Error"));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getMyCourseNewQuestions = (userId, itemsPerPage, page = 1) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${prefix}/myCoursesNewQuestions?user_id=${userId}&itemsPerPage=${itemsPerPage}&page=${page}`
    )
      ?.then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            ?.json()
            ?.then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getMyBookmarkedQuestions = (userId, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/myBookmarkedQuestions?user_id=" + userId + "&page=" + page + 
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            ?.json()
            ?.then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

// simulation API
const getMySimulationResult = (userId, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/myExamSimulations?user_id=" + userId + "&page=" + page + 
      "&itemsPerPage=" + itemsPerPage
    )
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            ?.json()
            ?.then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => {
        reject();
      });
  });
};

const postUpvote = (userId, commentId = null, replyId = null) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/upvote", { method: "POST", headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: userId,
            comment_id: commentId,
            reply_id: replyId
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          resolve(null);
        }
      })
      .catch((err) => {
        reject("Server Error");
      })
  });
}

const postDownvote = (userId, commentId = null, replyId = null) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/downvote", { method: "POST", headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: userId,
            comment_id: commentId,
            reply_id: replyId
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          resolve(null);
        }
      })
      .catch((err) => {
        reject("Server Error");
      })
  });
}

const postUnvote = (userId, commentId = null, replyId = null) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/unvote", { method: "POST", headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: userId,
            comment_id: commentId,
            reply_id: replyId
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          resolve(null);
        }
      })
      .catch((err) => {
        reject("Server Error");
      })
  });
}

const postBookmarkQuestion = (userId, questionId) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/bookmarkQuestion", { method: "POST", headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: userId,
            question_id: questionId
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          resolve(null);
        }
      })
      .catch((err) => {
        reject("Server Error");
      })
  });
}

const postUnbookmarkQuestion = (userId, questionId) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/unbookmarkQuestion", { method: "POST", headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: userId,
            question_id: questionId
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          resolve(null);
        }
      })
      .catch((err) => {
        reject("Server Error");
      })
  });
}

const postReply = (userId, commentId, content) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/reply", { method: "POST", headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            author: userId,
            comment_id: commentId,
            content: content
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          resolve(null);
        }
      })
      .catch((err) => {
        reject("Server Error");
      })
  });
}

const postComment = (userId, questionId, content) => {
  return new Promise((resolve, reject) => {
    fetch(
      prefix + "/comment", { method: "POST", headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            author: userId,
            question_id: questionId,
            content: content
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          resolve(null);
        }
      })
      .catch((err) => {
        reject("Server Error");
      })
  });
}

const getSingleQuestion = (questionId) => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/question?question_id=" + questionId)
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const API = {
  getUser,
  getCourses,
  getCourse,
  getMyCourses,
  getQuestion,
  getQuestions,
  getComment,
  getDiscussions,
  getMyQuestions,
  getMyComments,
  getReplies,
  getMyReplies,
  searchCourses,
  searchQuestion,
  searchDiscussion,
  getMyCourseNewQuestions,
  getMyBookmarkedQuestions,
  getMySimulationResult,
  postUpvote,
  postDownvote,
  postUnvote,
  postBookmarkQuestion,
  postUnbookmarkQuestion,
  postReply,
  postComment,
  getSingleQuestion
};
export default API;
