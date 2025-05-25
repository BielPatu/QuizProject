import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserScoreService } from './user-score.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-score')
export class UserScoreController {
    constructor(private readonly userQuizScoreService: UserScoreService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('submit')
    submitScore(@Req() req, @Body() body) {
    const userId = req.user.id; 
    const { quizId, score } = body;
    return this.userQuizScoreService.saveScore(userId, quizId, score);
}
    @UseGuards(AuthGuard('jwt'))
    @Get(':userId')
    getScoresByUser(@Param('userId') userId: number) {
    return this.userQuizScoreService.getScoresByUser(userId);

}
}