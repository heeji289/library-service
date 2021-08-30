const BookService = require("../services/book");
const RatingService = require("../services/rating");
const RecordService = require("../services/record");
const UserService = require("../services/user");

module.exports = class RatingController {
  // 리뷰 생성 기능
  static async createRating(req, res, next) {
    const id = req.params.id;
    const user_id = req.user.id;
    const { cur_star, cur_bookId, cur_userId, cur_comment } = req.body;
    try {
      const isRecord = await RecordService.checkRecordReturned(
        user_id,
        id,
        true
      );

      // 대여기록이 없으면 예외처리
      if (!isRecord) {
        return res.json({ error: "not_returned" });
      }

      const isRated = await RecordService.checkRecordRated(user_id, id, true);

      // 리뷰를 이미 작성했으면 예외처리
      if (isRated) {
        return res.json({ error: "already" });
      }

      if (!isRated && isRecord) {
        const user = await UserService.findUserById(user_id);

        // 리뷰 생성
        await RatingService.createRating({
          user_name: user.username,
          rating: cur_star,
          comment: cur_comment,
          createdAt: Date.now(),
          UserId: user_id,
          BookId: id,
        });

        // 대여기록에서 rated=true로 업데이트
        await RecordService.updateRecordRated(user_id, id, true);

        // 책의 별점 평균을 계산
        const ratings = await RatingService.findByBookId(id);
        const numOfRatings = ratings.length;
        let sumOfRatings = 0;
        ratings.forEach((rating) => (sumOfRatings += rating.rating));
        const avgOfRatings = Math.round(sumOfRatings / numOfRatings);

        // 평균 별점 업데이트
        await BookService.updateRatingOfBook(avgOfRatings, id);

        return res.json({ redirect: `/book/${cur_bookId}` });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // 리뷰 삭제 기능
  static async deleteRating(req, res, next) {
    const id = req.params.id;
    const user_id = req.user.id;

    const isRated = await RecordService.checkRecordRated(user_id, id, true);

    // 리뷰가 없을 경우 예외 처리
    if (!isRated) {
      return res.json({ error: "noReview" });
    }

    // 리뷰 삭제
    await RatingService.deleteRating(user_id, id);

    // 대여기록 rated=false로 업데이트
    await RecordService.updateRecordRated(user_id, id, false);

    // 별점 다시 계산
    const ratings = await RatingService.findByBookId(id);
    const numOfRatings = ratings.length;
    let sumOfRatings = 0;
    ratings.forEach((rating) => (sumOfRatings += rating.rating));
    const avgOfRatings = Math.round(sumOfRatings / numOfRatings);

    // 평균 별점 업데이트
    await BookService.updateRatingOfBook(avgOfRatings, id);

    return res.json({ redirect: `/book/${id}` });
  }

  // 리뷰 내용 수정 기능
  static async updateRating(req, res, next) {
    const id = req.params.id;
    const user_id = req.user.id;
    const changeComment = req.body.changeComment;

    const isRated = await RecordService.checkRecordRated(user_id, id, true);

    // 리뷰가 없을 경우 예외 처리
    if (!isRated) {
      return res.json({ error: "noReview" });
    }

    await RatingService.updateRating(user_id, id, changeComment);

    return res.redirect(`/book/${id}`);
    // return res.json({ redirect: `/book/${id}` });
  }
};
