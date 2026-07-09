import { mount } from '@vue/test-utils'
import HomePage from '@/views/home/index.vue'
import { describe, expect, test } from 'vitest'

describe('home/index.vue', () => {
  test('renders home page', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('首页')
  })
})
