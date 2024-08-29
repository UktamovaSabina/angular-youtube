export interface YouTubeVideoListResponse {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: YouTubeVideo[];
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface YouTubeVideo {
    kind: string;
    etag: string;
    id: string;
    snippet: VideoSnippet;
    statistics: VideoStatistics;
}

export interface VideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: LocalizedContent;
    defaultAudioLanguage: string;
}

export interface Thumbnails {
    default: ThumbnailDetail;
    medium: ThumbnailDetail;
    high: ThumbnailDetail;
    standard: ThumbnailDetail;
    maxres: ThumbnailDetail;
}

export interface ThumbnailDetail {
    url: string;
    width: number;
    height: number;
}

export interface LocalizedContent {
    title: string;
    description: string;
}

export interface VideoStatistics {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
}
