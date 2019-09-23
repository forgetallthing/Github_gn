import { onThemeChange, onThemeInit, onShowCustomThemeView } from './theme';
import { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite } from './popular';
import { onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite } from './trending';
import { onLoadLanguage } from './language';
import { onLoadFavoriteData } from './favorite'
import { onSearch,onSearchCancel,onLoadMoreSearch } from './search'

export default {
    onThemeChange,
    onRefreshPopular,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending,
    onLoadFavoriteData,
    onFlushPopularFavorite,
    onFlushTrendingFavorite,
    onLoadLanguage,
    onThemeInit,
    onShowCustomThemeView,
    onSearch,
    onSearchCancel,
    onLoadMoreSearch,
}