function bannerWidth(width) {
    if (width > 2100) {
        return 350
    } else if (width < 2000 && width > 1600) {
        return 300
    } else if (width < 1600 && width > 1400) {
        return 280
    } else if (width < 1400 && width > 1200) {
        return 230
    } else if (width < 1200 && width > 1100) {
        return 200
    } else if (width < 1100 && width > 900) {
        return 170
    } else if (width < 900 && width > 600) {
        return 150
    } else if (width < 600 && width > 400) {
        return 100
    }
}

export default bannerWidth
