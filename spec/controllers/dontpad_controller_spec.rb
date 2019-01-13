require 'rails_helper'

RSpec.describe DontpadController, type: :controller do
  before do
    Project.create
  end

  describe '/' do
    it 'returns http 200' do
      get :index
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /donpad' do
    it 'returns http 200' do
      get :update, params: { text: 'new text' }
      expect(response).to have_http_status(200)
    end

    it 'updates the project content' do
      get :update, params: { text: 'new text' }
      expect(Project.first.content).to eq('new text')
    end
  end

  after do
    Project.destroy_all
  end
end
