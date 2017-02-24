import scrapy
from collections import defaultdict

class ArbitraryItem(scrapy.Item):
    """
    Arbitrary items, creates fields dynamically
    """
    fields = defaultdict(scrapy.Field)
    
    def __setitem__(self, key, value):
        self._values[key] = value
        self.fields[key] = {}
        
    def __repr__(self):
        """
        Only print out course codes
        """
        return repr({"code": self['code']})
    
    def __str__(self):
        return ""