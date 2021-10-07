module.exports = {
  lang: 'en-US',
  title: 'Doatask',
  description: 'Learning tool',
  base: '/doatask/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    repo: 'tk1/doatask',
    docsDir: 'docs',
    lastUpdated: 'Last Updated',

    nav: [
      { 
        text: 'Guide',
        link: '/guide/user',
        activeMatch: '^/$|^/guide/' },
      {
        text: 'Reference',
        link: '/reference/data',
        activeMatch: '^/reference/'
      }
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/reference/': getReferenceSidebar(),
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: 'Guide',
      children: [
        { text: 'What is Doatask?', link: '/' },
        { text: 'Getting started', link: '/start' },
        { text: 'Concepts', link: '/concepts' },
        { text: 'User Guide', link: '/guide/user' },
        { text: 'Developer Guide', link: '/guide/developer' }
      ]
    }
  ]
}

function getReferenceSidebar() {
  return [ 
    {
      text: 'Data Structure',
      children: [
        { text: 'Entitities', link: '/reference/data'},
        { text: 'API', link: '/reference/api'}
      ]
    }
  ]
}