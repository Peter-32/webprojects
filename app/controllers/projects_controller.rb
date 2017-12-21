class ProjectsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
  end
  def network
  end
  def champion
  end
  def scala_java_network
  end
  def numbers
  end
  def q_and_a
  end
  def crosses_largest_area
  end
  def getxmljungle
    render html: File.read(Rails.root + "app/xml/Jungle.xml")
  end
  def getxmlmiddle
    render html: File.read(Rails.root + "app/xml/Middle.xml")
  end
  def getxmltop
    render html: File.read(Rails.root + "app/xml/Top.xml")
  end
end
