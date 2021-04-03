export default {
    install(Vue) {
        const requireComponent = require.context('@/components', true, /[a-z0-9]+\.(jsx?|vue)$/i)
        requireComponent.keys().forEach(fileName => {
            const componentConfig = requireComponent(fileName)
            const componentName = componentConfig.default.name
            if (componentName) {
                Vue.component(componentName, componentConfig.default)
            }
        })
    },
}
