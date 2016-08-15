module SearchHelper
  # Case-insensitive thanks to usage of ILIKE
  def substring_search(attr_name, query)
    wildcarded_queries = ["%#{query}%", "#{query}%", "%#{query}"]

    where((["#{attr_name} ILIKE ?"] * 3).join(" OR "), *wildcarded_queries)
  end
end
