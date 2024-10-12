import { AuthenticatedRequest } from '../interfaces/requests';
import { tryCatchWrapper } from '../util/try_catch_wrapper';
import { HttpError, httpErrorStatusCodes } from '../interfaces/http_errors';
import userRepo from '../repo/user';
import externalNewsSupport from '../support/external_news';

async function getNews(req: AuthenticatedRequest) {
    const { userId } = req;
    const user = await userRepo.getUserById(userId);
    if (!user) throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'User not found');

    const preferences = user.preferences || [];
    const news = await externalNewsSupport.fetchNews(preferences);
    return { success: true, news };
}

export default {
    getNews: tryCatchWrapper(getNews),
};
