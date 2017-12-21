module ApplicationHelper
  def markdown(text)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML,
       no_intra_emphasis: true,
       fenced_code_blocks: false,
       disable_indented_code_blocks: false)
   return markdown.render(text).html_safe
   end
end
